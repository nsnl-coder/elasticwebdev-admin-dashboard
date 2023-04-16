import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import productSchema, { Product } from '@src/yup/productSchema';
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import Input from '@src/shared/inputs/Input';
import Select from '@src/shared/inputs/Select';
import RichText from '@src/shared/inputs/RichText';
import Textarea from '@src/shared/inputs/Textarea';
import FilesInput from '@src/shared/inputs/FilesInput';
import Variants from '@src/components/products/Variants';

function Create(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = (data: Product) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex gap-x-5 justify-center my-8 px-6"
    >
      <BigBlocks>
        <Block>
          <Variants />
        </Block>
        <Block>
          <Input
            register={register}
            errors={errors}
            fieldName="name"
            labelTheme="light"
            placeholder="T-shirt for man....."
            label="Name:"
          />
          <Textarea
            register={register}
            errors={errors}
            fieldName="overview"
            labelTheme="light"
            placeholder="short description about your product"
            label="Overview:"
          />
          <div className="flex gap-3">
            <Input
              register={register}
              errors={errors}
              fieldName="price"
              labelTheme="light"
              placeholder="19.99"
              label="Price:"
              type="number"
            />
            <Input
              register={register}
              errors={errors}
              fieldName="discountPrice"
              labelTheme="light"
              placeholder="9.99"
              label="Discount price:"
              type="number"
            />
          </div>
        </Block>
        <Block>
          <RichText
            control={control}
            defaultValue=""
            errors={errors}
            fieldName="description"
            labelTheme="light"
            label="Description:"
          />
          <Select
            errors={errors}
            register={register}
            fieldName="isPinned"
            labelTheme="light"
            options={[
              { name: 'pin', value: 'true' },
              { name: 'Do not pin', value: 'false' },
            ]}
            label="Pin to top?"
          />
        </Block>
        <Block>
          <FilesInput
            fieldName="images"
            allowedTypes="*"
            control={control}
            labelTheme="bold"
            errors={errors}
            maxFilesCount={10}
          />
          <p className="text-red-400">Collection select here</p>
        </Block>
      </BigBlocks>

      <SmallBlocks>
        <Block>
          <Select
            errors={errors}
            register={register}
            fieldName="status"
            labelTheme="bold"
            options={['draft', 'active']}
            label="status"
          />
          <div className="flex justify-end mt-4">
            <SubmitBtn />
          </div>
        </Block>
        <Block>
          <FilesInput
            fieldName="previewImages"
            allowedTypes="image"
            control={control}
            labelTheme="bold"
            errors={errors}
            maxFilesCount={2}
          />
        </Block>
      </SmallBlocks>
    </form>
  );
}

export default Create;
