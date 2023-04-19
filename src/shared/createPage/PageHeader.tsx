import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

interface Props {
  reset: UseFormReset<any>;
  isDirty: boolean;
}

function PageHeader(props: Props): JSX.Element | null {
  const { reset, isDirty } = props;
  if (!isDirty) return null;

  return (
    <div className="w-full fixed top-0 left-0 bg-zinc-800 h-16 flex text-white">
      <div className="w-60 bg-red-400 h-16"></div>
      <div className="flex-grow max-w-5xl px-6 mx-auto flex items-center justify-between">
        <h1 className="font-semibold"> Unsaved changes </h1>
        <div className="flex gap-x-3">
          <button
            type="button"
            className="px-4 py-1 rounded-md border border-gray-500 hover:bg-white/10"
            onClick={() => reset()}
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-4 py-1 rounded-md border border-gray-500 bg-primary hover:brightness-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
