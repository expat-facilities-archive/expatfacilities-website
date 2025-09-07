import { DashboardField } from "@components/Layout/Dashboard";
import React, { FormEvent, useCallback, useState } from "react";

interface Props {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

const CheckoutCardField: React.FC<Props> = ({ onChange, ...rest }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      event.preventDefault();

      setValue(formatValueToCreditCard(event.currentTarget.value));

      onChange(event);
    },
    [onChange]
  );

  const formatValueToCreditCard = (value: string) => {
    let valueFormatted = value.replace(
      /[A-Za-z}"`~_=.\->\]|<?+*/,;\\[:{\\!@#\\/'$%^&*()]/g,
      ""
    );

    if (
      valueFormatted.length === 5 ||
      valueFormatted.length === 10 ||
      valueFormatted.length === 15
    ) {
      valueFormatted = valueFormatted
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ");
    }

    return valueFormatted;
  };

  return (
    <DashboardField
      {...rest}
      value={value}
      onChange={(event: FormEvent<HTMLInputElement>) => handleChange(event)}
      type="text"
      inputtype="numeric"
      maxLength={19}
    />
  );
};

export default CheckoutCardField;
