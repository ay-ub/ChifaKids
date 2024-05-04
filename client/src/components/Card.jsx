import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CardModel({ title, nbr, description, icon }) {
  return (
    <Card className="flex-1 hover:border-primary-foreground transition duration-700 ease-in-out lightBg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium capitalize">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{nbr}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default CardModel;
