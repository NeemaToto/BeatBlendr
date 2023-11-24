
export default function Dashboard() {
  const token = localStorage.getItem('token')
  
  return (
    <div className="Container">
      Dashboard
      {token}
    </div>
  );
}

