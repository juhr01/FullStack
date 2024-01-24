import { useParams } from 'react-router-dom';

interface Patient {
    id: string;
    name: string;
    gender: string;
    occupation: string;
  }
  
  interface PatientPageProps {
    patients: Patient[];
  }

const PatientPage = (props: PatientPageProps) => {
    const { id } = useParams();
    const patient = props.patients.find(p => p.id === id);

    if (!patient) {
        // Handle the case when the patient is not found
        return <div>Patient not found</div>;
      }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>occupation: {patient.occupation}</p>

        </div>
    );
};

export default PatientPage;