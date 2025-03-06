const stats = [
  { number: "1000+", text: "STUDENTS ENROLLED" },
  { number: "50+", text: "PARTNER COMPANIES" },
  { number: "96%", text: "SATISFACTION RATE" },
  { number: "91%", text: "COMPLETION RATE" }
];

const StatsSection = () => (
  <section className="py-10 text-center font-[Poppins]">
    <h2 className="text-sm">Your goals are our goals</h2>
    <h2 className="text-lg font-medium">Invest in yourself today. Unlock success for a lifetime.</h2>
    <div className="flex justify-center mt-4 space-x-10 ">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-semibold text-green-700">{stat.number}</div> 
          <div className="text-sm font-medium text-green-700">{stat.text}</div> 
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
