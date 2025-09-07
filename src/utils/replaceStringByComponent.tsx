const replaceStringByComponent = (
  str: string,
  Component: React.ComponentType<any>,
  splitSymbol = "%"
): JSX.Element => {
  console.log("content match:", str.split(splitSymbol));

  // "Hey %Anna% how are you?" -> Hey <Component>Anna</Component> how are you?
  const content = str.split(splitSymbol);

  return (
    <>
      {content.map((c, i) => {
        return i % 2 === 0 ? c : <Component key={i}>{c}</Component>;
      })}
    </>
  );
};

export default replaceStringByComponent;
