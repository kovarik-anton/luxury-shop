import ContactUsForm from "@/components/store/forms/contact-us";

export default async function ContactUsPage() {
  return (
    <div className="min-h-screen mb-4">
      <div className="w-full flex flex-column mx-auto">
        <div className="p-4 ">
          <h1 className="text-center font-bold text-slate-600 mb-2"></h1>
          <p></p>
        </div>
      </div>
      <ContactUsForm></ContactUsForm>
    </div>
  );
}
