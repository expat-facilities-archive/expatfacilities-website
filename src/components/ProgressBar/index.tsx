import NextProgress from "next-progress";
import { useTheme } from "styled-components";

const ProgressBar: React.FC = () => {
  const theme = useTheme();
  return (
    <NextProgress
      delay={100}
      color={theme.colors.accent.light}
      options={{
        showSpinner: false,
      }}
    />
  );
};

export default ProgressBar;
