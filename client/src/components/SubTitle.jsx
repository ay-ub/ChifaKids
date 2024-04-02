function SubTitle({ title, icon }) {
  return (
    <div className="flex items-center text-2xl bg-p rounded-md p-2 text-white select-none">
      <span className="flex gap-2 items-center justify-center">
        <span className="icon">{icon}</span>
        <span>{title}</span>
      </span>
    </div>
  );
}

export default SubTitle;
