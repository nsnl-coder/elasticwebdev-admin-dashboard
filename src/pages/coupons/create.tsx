import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//
import { Collection } from '@src/yup/collectionSchema';
import BigBlocks from '@src/shared/form/BigBlocks';
import Block from '@src/shared/form/Block';
import SmallBlocks from '@src/shared/form/SmallBlocks';
import SubmitBtn from '@src/shared/form/SubmitBtn';
import couponSchema, { Coupon } from '@src/yup/couponSchema';

function Create(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Coupon>({
    resolver: yupResolver(couponSchema),
  });

  const onSubmit = (data: Collection) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex gap-x-5 justify-center my-8 px-6"
    >
      <BigBlocks>
        <Block></Block>
      </BigBlocks>
      <SmallBlocks>
        <Block>
          <div className="flex justify-end mt-4">
            <SubmitBtn />
          </div>
        </Block>
      </SmallBlocks>
    </form>
  );
}

export default Create;
