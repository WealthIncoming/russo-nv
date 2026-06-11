import cmsData from "@/data/cms.json";
import type { WixDataItem } from "./types";

/**
 * Pagination options for querying collections
 */
export interface PaginationOptions {
  /** Number of items per page (default: 50, max: 1000) */
  limit?: number;
  /** Number of items to skip (for offset-based pagination) */
  skip?: number;
}

/**
 * Metadata for a multi-reference field. Kept for API compatibility — the
 * frozen snapshot has no reference fields, so this is never populated.
 */
export interface RefFieldMeta {
  totalCount: number;
  returnedCount: number;
  hasMore: boolean;
}

/**
 * Paginated result with metadata for infinite scroll
 */
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  hasNext: boolean;
  currentPage: number;
  pageSize: number;
  nextSkip: number | null;
}

type IncludeRefs = { singleRef?: string[]; multiRef?: string[] } | string[];

// The frozen CMS snapshot (exported from Wix). Keyed by collection id.
const collections = cmsData as unknown as Record<string, WixDataItem[]>;

/**
 * Read-only CRUD service backed by the frozen `src/data/cms.json` snapshot.
 *
 * The public site only ever reads collections (`getAll`), so reads are fully
 * implemented from local data and the mutating methods are intentionally
 * stubbed — there is no live database in the self-hosted static build.
 */
export class BaseCrudService {
  /**
   * Retrieves items from a collection with offset pagination (default 50/page).
   * `includeRefs` is accepted for call-site compatibility but ignored (the
   * snapshot has no reference fields).
   */
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    _includeRefs?: IncludeRefs,
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    const all = (collections[collectionId] ?? []) as T[];
    const limit = Math.min(pagination?.limit ?? 50, 1000);
    const skip = pagination?.skip ?? 0;
    const items = all.slice(skip, skip + limit);
    const hasNext = skip + limit < all.length;

    return {
      items,
      totalCount: all.length,
      hasNext,
      currentPage: limit > 0 ? Math.floor(skip / limit) : 0,
      pageSize: limit,
      nextSkip: hasNext ? skip + limit : null,
    };
  }

  /**
   * Retrieves a single item by `_id`, or null if not found.
   */
  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    _includeRefs?: IncludeRefs
  ): Promise<T | null> {
    const all = (collections[collectionId] ?? []) as T[];
    return all.find((i) => i._id === itemId) ?? null;
  }

  // ---- Mutations: not supported in the static build -----------------------

  static async create<T extends WixDataItem>(..._args: unknown[]): Promise<T> {
    throw new Error("BaseCrudService.create is not available in the static build");
  }

  static async update<T extends WixDataItem>(..._args: unknown[]): Promise<T> {
    throw new Error("BaseCrudService.update is not available in the static build");
  }

  static async delete<T extends WixDataItem>(..._args: unknown[]): Promise<T> {
    throw new Error("BaseCrudService.delete is not available in the static build");
  }

  static async addReferences(..._args: unknown[]): Promise<void> {
    throw new Error("BaseCrudService.addReferences is not available in the static build");
  }

  static async removeReferences(..._args: unknown[]): Promise<void> {
    throw new Error("BaseCrudService.removeReferences is not available in the static build");
  }
}
