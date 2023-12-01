import diagnosesData from '../data/diagnoses.ts';
import { Diagnose } from '../types.ts';

const getEntries = (): Diagnose[] => {
    return diagnosesData;
}

export default {
    getEntries
}
