function SubTitile({ title, icon }) {
  return (
    <div className="flex items-center justify-center gap-2 text-2xl bg-p rounded-md p-2 text-white select-none">
      <span className="icon">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

export default SubTitile;
