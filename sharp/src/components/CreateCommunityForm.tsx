import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { TextField, Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { v4 as uuidv4 } from 'uuid';
import { useCreateCommunity } from '../services/communityService';
import { userInfo } from 'os';

interface CreateCommunityFormProps {
  onSubmit: () => void;
}

interface FormValues {
  name: string;
  description: string;
  members: { value: string }[];
  keywords: { value: string }[];
}

const CreateCommunityForm: React.FC<CreateCommunityFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      members: [{ value: '' }],
      keywords: [{ value: '' }],
    },
  });
  const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({
    control,
    name: 'keywords',
  });
  const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({
    control,
    name: 'members',
  });
  const createCommunity = useCreateCommunity();

  const handleFormSubmit = (data: FormValues) => {
    const communityId = uuidv4();
    createCommunity.mutate(
      {
        community_name: data.name,
        description: data.description,
        members: data.members.map(m => m.value),
        keywords: data.keywords.map(k => k.value),
        community_id: communityId,
      },
      {
        onSuccess: () => {
          onSubmit();
          reset();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Community name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Community Name"
            fullWidth
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            multiline
            rows={4}
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      <div style={{ marginBottom: '1rem' }}>
        <label>Members</label>
        {memberFields.map((field, index) => (
          <div key={field.id} style={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`members.${index}.value`}
              control={control}
              rules={{ required: 'Member is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={`Member ${index + 1}`}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  style={{ marginBottom: '1rem', marginRight: '1rem' }}
                />
              )}
            />
            <IconButton onClick={() => removeMember(index)}>
              <RemoveCircleOutlineIcon color="error" />
            </IconButton>
          </div>
        ))}
        <Button
          type="button"
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => appendMember({ value: '' })}
        >
          Add Member
        </Button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Keywords</label>
        {keywordFields.map((field, index) => (
          <div key={field.id} style={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`keywords.${index}.value`}
              control={control}
              rules={{ required: 'Keyword is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={`Keyword ${index + 1}`}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  style={{ marginBottom: '1rem', marginRight: '1rem' }}
                />
              )}
            />
            <IconButton onClick={() => removeKeyword(index)}>
              <RemoveCircleOutlineIcon color="error" />
            </IconButton>
          </div>
        ))}
        <Button
          type="button"
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => appendKeyword({ value: '' })}
        >
          Add Keyword
        </Button>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
};

export default CreateCommunityForm;
