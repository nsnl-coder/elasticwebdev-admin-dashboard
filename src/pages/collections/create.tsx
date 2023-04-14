import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import Input from '@src/shared/form/Input';
import Select from '@src/shared/form/Select';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import Collection from '@src/types/collection';
import collectionSchema from '@src/yup/collectionSchema';
import RichText from '@src/shared/form/RichText';

function Create(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Collection>({
    resolver: yupResolver(collectionSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex gap-x-5 justify-center my-8 px-6"
    >
      <BigBlocks>
        <Block>
          <Input
            register={register}
            fieldName="name"
            errors={errors}
            label="Name:"
            required={false}
          />
          <RichText
            control={control}
            fieldName="description"
            defaultValue='{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"dsaasdsad"}]}]}'
          />
        </Block>
        <Block>
          <Select
            register={register}
            errors={errors}
            fieldName="isPinned"
            label="Pin?"
            options={[
              { name: 'Do not pin', value: 'false' },
              { name: 'Pin to top', value: 'true' },
            ]}
          />
        </Block>
      </BigBlocks>
      <SmallBlocks>
        <Block>
          <Select
            register={register}
            errors={errors}
            fieldName="status"
            options={['draft', 'active']}
          />
          <div className="flex justify-end mt-4">
            <SubmitBtn />
          </div>
        </Block>
      </SmallBlocks>
    </form>
  );
}

export default Create;
