import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const CreateCommunityForm: React.FC = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Integrate with your backend to create a new community
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="communityName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Community Name" fullWidth />}
      />
      <Button type="submit" variant="contained" color="primary">Create</Button>
    </form>
  );
};

export default CreateCommunityForm;
