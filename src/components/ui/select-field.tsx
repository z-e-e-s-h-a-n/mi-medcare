import { FormField, type BaseFieldProps } from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface SelectFieldProps<TFormData> extends BaseFieldProps<TFormData> {
  options: string[];
}

export const SelectField = <TFormData,>({
  options,
  disabled,
  ...props
}: SelectFieldProps<TFormData>) => {
  return (
    <FormField {...props}>
      {({ isInvalid, ...field }) => (
        <Select
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger
            id={field.name}
            aria-invalid={isInvalid}
            className="w-full capitalize"
          >
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>

          <SelectContent position="popper">
            {options.map((o) => (
              <SelectItem key={o} value={o} className="capitalize">
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  );
};
