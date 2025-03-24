import { Lock, ShieldAlert, ShieldCheck } from "lucide-react";

export default function ProductAssurancePolicy() {
  return (
    <section className="mt-4">
      <h4 className="text-main-primary">Luxury shop assurance</h4>
      <div className="text-main-primary flex items-center mt-3 text-sm">
        <ShieldCheck className="w-5" />
        <div className="flex-1 px-1">
          <p className="text-main-primary leading-5">Safe payments</p>
          <p className="text-main-secondary leading-5">
            &nbsp;&nbsp;Payment methods used by many shoppers
          </p>
        </div>
      </div>
      <div className="text-main-primary flex items-center mt-3 text-sm">
        <Lock className="w-5" />
        <div className="flex-1  px-1">
          <p className="text-main-primary leading-5">Security & privacy</p>
          <p className="text-main-secondary leading-5">
            &nbsp;&nbsp;We respect your privacy so your personal details are
            safe
          </p>
        </div>
      </div>
    </section>
  );
}
