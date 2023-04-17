import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import shippingSchema, { Shipping } from '@src/yup/shippingSchema';
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import Input from '@src/shared/inputs/Input';
import Select from '@src/shared/inputs/Select';

function Create(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Shipping>({
    resolver: yupResolver(shippingSchema),
  });

  const onSubmit = (data: Shipping) => {
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
            errors={errors}
            fieldName="display_name"
            labelTheme="light"
            placeholder="Express shipping"
            label="Display name:"
            tooltip="this name will be displayed to user"
          />
          <Input
            register={register}
            errors={errors}
            fieldName="fees"
            labelTheme="light"
            placeholder="9.99"
            label="Fees:"
            type="number"
          />
          <Input
            register={register}
            errors={errors}
            fieldName="freeshipOrderOver"
            labelTheme="light"
            label="Freeship order over:"
            type="number"
            tooltip="Leave empty if you not want freeship for all orders!"
          />
        </Block>
        <Block>
          <div className="flex gap-x-3">
            <Input
              register={register}
              errors={errors}
              fieldName="delivery_min"
              labelTheme="light"
              placeholder="2"
              label="Delivery Min:"
            />
            <Select
              errors={errors}
              register={register}
              fieldName="delivery_min_unit"
              labelTheme="light"
              options={['hour', 'day', 'business_day', 'week', 'month']}
              label="unit"
            />
          </div>
          <div className="flex gap-x-3">
            <Input
              register={register}
              errors={errors}
              fieldName="delivery_max"
              labelTheme="light"
              placeholder="6"
              label="Delivery max:"
            />
            <Select
              errors={errors}
              register={register}
              fieldName="delivery_max_unit"
              labelTheme="light"
              options={['hour', 'day', 'business_day', 'week', 'month']}
              label="unit"
            />
          </div>
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
      </SmallBlocks>
    </form>
  );
}

export default Create;
