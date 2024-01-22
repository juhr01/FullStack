import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
  };

  const parseGender = (gender: any): Gender => {
    if (!isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
  };

  const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
  };

  const parseEntry = (entry: unknown): Entry => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Incorrect or missing entry data');
    }
    return entry
  }

  const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries)) {
      throw new Error('Incorrect or missing entries data');
    }
  
    return entries.map((entry) => parseEntry(entry));
  };

  const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
      const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),
      };
    
      return newEntry;
    }
  
    throw new Error('Incorrect data: a field missing');
  };
  
  export default toNewPatientEntry;