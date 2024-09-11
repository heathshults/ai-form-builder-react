import { BehaviorSubject } from 'rxjs';



export class FormFieldsService {
  private static instance: FormFieldsService;
  public updateFieldsEvent: BehaviorSubject<string[]>;
  public fields: string[] = [''];

  
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
    this.fields = fields;
    this.updateFieldsEvent.next(this.fields);
  }    
    
}
 export default FormFieldsService;