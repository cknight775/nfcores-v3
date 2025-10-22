import { Timestamp } from 'firebase/firestore';

export const calculateAge = (birthDate: Timestamp | Date): number => {
  const birth = birthDate instanceof Timestamp ? birthDate.toDate() : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const formatDate = (date: Timestamp | Date): string => {
  const d = date instanceof Timestamp ? date.toDate() : date;
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
};
