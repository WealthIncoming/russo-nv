// Local replacement for the former `@wix/data` item types.
// The self-hosted build reads a frozen JSON snapshot, so we only need a
// structural shape: every record has an `_id`, plus arbitrary content fields.
export interface WixDataItem {
  _id: string;
  _createdDate?: string | Date;
  _updatedDate?: string | Date;
  [key: string]: unknown;
}

export type WixDataQueryResult = {
  items: WixDataItem[];
  totalCount?: number;
};
