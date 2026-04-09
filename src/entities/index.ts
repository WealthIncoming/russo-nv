/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: certifications
 * Interface for Certifications
 */
export interface Certifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  certificationName?: string;
  /** @wixFieldType text */
  issuingBody?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  logo?: string;
  /** @wixFieldType date */
  dateIssued?: Date | string;
  /** @wixFieldType date */
  expirationDate?: Date | string;
  /** @wixFieldType url */
  certificationUrl?: string;
}


/**
 * Collection ID: companyvalues
 * Interface for CompanyValues
 */
export interface CompanyValues {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  valueTitle?: string;
  /** @wixFieldType text */
  valueDescription?: string;
  /** @wixFieldType text */
  safetyComplianceDetails?: string;
  /** @wixFieldType text */
  qualityWorkmanship?: string;
  /** @wixFieldType text */
  clientCommunication?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
}


/**
 * Collection ID: industrialservices
 * Interface for IndustrialServices
 */
export interface IndustrialServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
  /** @wixFieldType text */
  processOverview?: string;
  /** @wixFieldType text */
  targetIndustries?: string;
}


/**
 * Collection ID: industriesserved
 * Interface for IndustriesServed
 */
export interface IndustriesServed {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  industryName?: string;
  /** @wixFieldType text */
  industryOverview?: string;
  /** @wixFieldType text */
  workDescription?: string;
  /** @wixFieldType text */
  keyServices?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  industryImage?: string;
  /** @wixFieldType text */
  typicalClients?: string;
}


/**
 * Collection ID: projectportfolio
 * Interface for ProjectPortfolio
 */
export interface ProjectPortfolio {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainProjectImage?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  secondaryProjectImage?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  projectLocation?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  client?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  scope?: string;
}
