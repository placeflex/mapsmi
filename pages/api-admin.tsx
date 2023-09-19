const ApiAdmin = () => {
  const onLoad = (v: any) => {
    console.log("V", v.target.files);
  };

  return (
    <div>
      <input type="file" name="file" onChange={v => onLoad(v)} />
      {/* <input type="submit" value="Загрузить файл"  /> */}
    </div>
  );
};

export default ApiAdmin;
