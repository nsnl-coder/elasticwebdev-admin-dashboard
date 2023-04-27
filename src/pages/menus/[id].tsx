import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import ChildMenus from '@src/_pages/menus/ChildMenus';
import menuSchema, { IMenu } from '@src/yup/menuSchema';

import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useGetOnes from '@react-query/query/useGetOnes';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';

import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import MultipleSelect from '@components/form/multipleSelect/MultipleSelect';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import FilesInput from '@components/inputs/FilesInput';
import Input from '@components/inputs/Input';
import Select from '@components/inputs/Select';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.menus;

  const { register, handleSubmit, control, reset, watch } = useForm<IMenu>({
    resolver: yupResolver(menuSchema),
  });

  const { createOne: createMenu } = useCreateOne<IMenu>(requestConfig);
  const { updateOne: updateMenu, isUpdating } =
    useUpdateOne<IMenu>(requestConfig);
  const { data: menu } = useGetOne<IMenu>(requestConfig, reset);
  const { data: menus } = useGetOnes<IMenu>(requestConfig, {
    fields: 'name',
    menuType: 'nested',
    includeUrlQuery: true,
  });

  const onSubmit = (data: IMenu) => {
    // already check if should create or update
    updateMenu(data, id);
    createMenu(data, id);
  };

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        title={menu?.name || 'Add menu'}
        requestConfig={requestConfig}
        id={menu?._id}
        status={menu?.status}
      />
      <div className="mx-auto flex gap-x-5 justify-center">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              control={control}
              fieldName="name"
              labelTheme="light"
              placeholder="menu display name"
              label="Name:"
              required={true}
            />
            <Input
              register={register}
              control={control}
              fieldName="link"
              labelTheme="light"
              placeholder="https://..."
              label="Link:"
            />
            <Select
              control={control}
              register={register}
              fieldName="menuType"
              labelTheme="light"
              options={[
                { name: 'root menu', value: 'root' },
                { name: 'nested menu', value: 'nested' },
              ]}
              label="Menu level:"
              tooltip="The menu hierarchy will start with the root menu at the first level!"
              defaultValue="nested"
            />
            {watch('menuType') === 'root' ? (
              <Select
                control={control}
                register={register}
                fieldName="position"
                labelTheme="light"
                options={['header', 'footer']}
                label="Position:"
              />
            ) : null}
            {watch('menuType') === 'root' ? (
              <Input
                register={register}
                control={control}
                fieldName="ordering"
                labelTheme="light"
                placeholder="1"
                label="Ordering:"
                tooltip="This will determine display order of root menu"
                required={true}
              />
            ) : null}
          </Block>
          <Block>
            <MultipleSelect
              fieldName="childMenus"
              control={control}
              labelTheme="light"
              options={menus}
              label="Child menus:"
              excludes={menu?._id ? [menu._id] : []}
            />
            <ChildMenus control={control} menus={menus} />
          </Block>
        </BigBlocks>
        <SmallBlocks>
          <Block>
            <Select
              register={register}
              control={control}
              fieldName="status"
              options={['draft', 'active']}
              labelTheme="bold"
              defaultValue={menu?.status}
            />
            <div className="flex justify-end mt-4">
              <SubmitBtn isUpdating={isUpdating} />
            </div>
          </Block>
          {watch('menuType') === 'root' ? (
            <Block>
              <FilesInput
                allowedTypes="*"
                control={control}
                fieldName="photo"
                maxFilesCount={1}
                labelTheme="bold"
              />
            </Block>
          ) : null}
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
