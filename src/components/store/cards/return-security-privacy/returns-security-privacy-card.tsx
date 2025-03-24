import { SecurityPrivacyCard } from "./security-privacy";
import { Returns } from "./returns";

interface Props {
  returnPolicy: string;
}

export default function ReturnPrivacySecurityCard({ returnPolicy }: Props) {
  return (
    <div className="mt-2 space-y-2">
      <Returns returnPolicy={returnPolicy} />
      <SecurityPrivacyCard />
    </div>
  );
}
