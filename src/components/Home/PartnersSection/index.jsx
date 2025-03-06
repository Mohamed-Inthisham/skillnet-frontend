import wiley from "../../../assets/wiley.webp";
import com from "../../../assets/99.webp";
import axiata from "../../../assets/axiata.webp";
import sys from "../../../assets/sys.webp";
import virt from "../../../assets/virt.webp";




const PartnersSection = () => (
  <section className="py-10 px-20 text-center">
    <h2 className="text-sm">Partners</h2>
    <h2 className="text-lg font-medium">Join Great Learning graduates at top-tier companies</h2>
    <div className="flex justify-center mt-6 space-x-6">
      {[
        { name: "Wiley", image: wiley },
        { name: "Virtusa", image: com },
        { name: "IFS", image: axiata },
        { name: "WSO2", image: sys },
        { name: "Sysco Labs", image: virt }
      ].map((partner, index) => (
        <img key={index} src={partner.image} alt={partner.name} className="h-20" />
      ))}
    </div>
  </section>
);

export default PartnersSection;
