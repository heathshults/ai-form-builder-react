import { BehaviorSubject } from 'rxjs';

export interface FieldArray {
  fields: Field[];
}
export interface Field {
  type: string;
  name: string;
  label: string;
}
 
export class FormFieldsService {
  private static instance: FormFieldsService;
  public updateFieldsEvent: BehaviorSubject<string[]>;
  public fields: Field[] = [
    {type: 'text', name: 'Example Field Name 1', label: 'Example Label Name 1'},
    {type: 'text', name: 'Example Field Name 2', label: 'Example Label Name 2'},
    
  ];

  
  private constructor() {
    this.updateFieldsEvent = new BehaviorSubject<string[]>([]); // Initial value is 'hide-sidebar'
  }
  
  public static getInstance(): FormFieldsService {
    if (!FormFieldsService.instance) {
      FormFieldsService.instance = new FormFieldsService();
    }
    return FormFieldsService.instance;
  }
  
  public addField(newField: string) {
      this.fields.push(newField)
      this.updateFieldsEvent.next(this.fields);
    }

  public removeField(field: string) {
    this.fields.splice(fields.indexOf(field), 1)
    this.updateFieldsEvent.next(this.fields);
  }
  
  public setFields(fields: string[]) {
    this.fields = fields.map(field => ({
      type: 'text',
      name: field.trim(),
      label: field.trim(),
    }));
    console.log('newArrayOfFields', this.fields);
    this.updateFieldsEvent.next(this.fields);
  }
    
}
 export default FormFieldsService;