

interface TextInputProps {
    name: string;
    label?: string;
    prefix?: string;
    placeholder?: string;
  };

export default function TextInput({ name, label, prefix, placeholder }:TextInputProps) {
    label = label ?? name;
    return(
        <div className="sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <div className="flex bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{prefix}</span>
                <input
                    type="text"
                    name={name}
                    id={name}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                />
                </div>
            </div>
        </div>
    )
}