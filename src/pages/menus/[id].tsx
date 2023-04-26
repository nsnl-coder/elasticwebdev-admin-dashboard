import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import BigBlocks from '@src/components/form/BigBlocks';
import Block from '@src/components/form/Block';
import SmallBlocks from '@src/components/form/SmallBlocks';
import SubmitBtn from '@src/components/form/SubmitBtn';
import menuSchema, { IMenu } from '@src/yup/menuSchema';
import Select from '@src/components/inputs/Select';
import FilesInput from '@src/components/inputs/FilesInput';
import Input from '@src/components/inputs/Input';
import { useRouter } from 'next/router';
import queryConfig from '@src/react-query/queryConfig';
import useGetOne from '@src/react-query/query/useGetOne';
import useUpdateOne from '@src/react-query/query/useUpdateOne';
import useCreateOne from '@src/react-query/query/useCreateOne';
import UpdatePageHeading from '@src/components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@src/components/updatePage/UpdatePageWrapper';
import MultipleSelect from '@src/components/form/multipleSelect/MultipleSelect';
import useGetOnes from '@src/react-query/query/useGetOnes';
import UpdatePageHeader from '@src/components/updatePage/UpdatePageHeader';
import ChildMenus from '@src/_pages/menus/ChildMenus';

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
  });

  const onSubmit = (data: IMenu) => {
    // already check if should create or update
    updateMenu(data, id);
    createMenu(data, id);
  };

  return (
    <UpdatePageWrapper control={control}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdatePageHeader reset={reset} control={control} />
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
      </form>
    </UpdatePageWrapper>
  );
}

export default Create;
