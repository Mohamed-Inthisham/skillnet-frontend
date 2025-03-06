const FeatureSection = () => (
  <section className="py-10 px-20 bg-white text-center">
    <h2 className="text-xl font-semibold mb-6">Courses and Professional Certificates</h2>
    <div className="grid grid-cols-4 gap-4">
      {['Face Recognition', 'Language Fluency', 'Answer Evaluation', 'Apply Jobs'].map((feature, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">{feature}</h3>
          <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureSection;
