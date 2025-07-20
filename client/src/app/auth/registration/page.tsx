'use client';
import React, { useEffect, useState } from 'react';
import StepOne from '@/app/components/registration/StepOne';
import StepTwo from '@/app/components/registration/StepTwo';
import StepThree from '@/app/components/registration/StepThree';
import StepFour from '@/app/components/registration/StepFour';
import StepFive from '@/app/components/registration/StepFive';
import { toast } from 'react-toastify';
import { registerMusician } from '@/lib/services/auth';
import {jwtDecode} from 'jwt-decode';




type RegistrationPageProps = {
    setRegistrationComplete: (complete: boolean) => void;
};

interface FormData {
  firstName: string;
  lastName: string;
  profilePic: string;
  genres: string[];
  instruments: string[];
  contact: string;
  profileCompleted?: boolean; // Optional field for profile completion status
}


const RegistrationPage = ({ setRegistrationComplete }: RegistrationPageProps) => {


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded =  jwtDecode(token || '') as { profileCompleted: boolean };
        if (decoded.profileCompleted) {
        console.log('✅ Profile is already completed.');
        setRegistrationComplete(true);
      } else {
        console.log('❌ Profile is not completed yet.');
        }

    }, [setRegistrationComplete]);


    const [step, setStep] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        profilePic: '',
        genres: [],
        instruments: [],
        contact: '',
        profileCompleted: false, // Initialize as false
    });
    
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (
        field: keyof typeof formData,
        value: string | string[]
    ) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    setLoading(true);
    setError('');

    const data = {
      ...formData,
      profileCompleted: true, 
    };

    const res = await registerMusician(data);

    if (res.error) {
      setError(res.error);
    } else {
      // Handle successful login, e.g., redirect or show a success message
      localStorage.setItem('token', res.token);
      
      if (res.profileCompleted === false) {
        toast.success('Registration successful! 👋');
      }
      
    }
    setLoading(false);
  };

    

    switch (step) {
    case 1:
      return <StepOne data={formData} onChange={handleChange} onNext={nextStep} />;
    case 2:
      return <StepTwo data={formData} onChange={handleChange} onNext={nextStep} onBack={prevStep}  />;
    case 3:
      return <StepThree data={formData} onChange={handleChange} onNext={nextStep} onBack={prevStep} />;
    case 4:
      return <StepFour data={formData} onChange={handleChange} onNext={nextStep} onBack={prevStep} />;
    case 5:
      return <StepFive data={formData} onSubmit={handleSubmit} onBack={prevStep} />;
    default:
      return null;
  }
  


}

export default RegistrationPage;