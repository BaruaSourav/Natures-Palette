// Submission Model
export class Submission {
  Name: string;
  Email: string;
  InstAffiliation: string;
  TypeOfData: string;
  DataSource: string;
  IsPublished: boolean;
  IsEmbargo: boolean;
  EmbargoDate: Date;
  MetadataFileUrl: string;
  RawFileUrl: string;
  Doi: string;
  ReferenceNumber: string;
}
