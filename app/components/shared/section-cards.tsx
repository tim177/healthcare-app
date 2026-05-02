import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

const cards = [
  {
    label: "Total Patients",
    value: "2,847",
    trend: "up",
    badge: "+8.2%",
    footer: "Growing steadily this month",
    sub: "Compared to last month",
  },
  {
    label: "Critical Cases",
    value: "38",
    trend: "down",
    badge: "-4.1%",
    footer: "Down from 40 last month",
    sub: "ICU & high-priority admissions",
  },
  {
    label: "Avg. Recovery Time",
    value: "6.4 days",
    trend: "up",
    badge: "+0.3d",
    footer: "Slight increase this period",
    sub: "Across all departments",
  },
  {
    label: "Appointments Today",
    value: "124",
    trend: "up",
    badge: "+12.5%",
    footer: "Higher than usual load",
    sub: "Scheduled vs walk-ins",
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trend === "up" ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {card.badge}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer}
              {card.trend === "up" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{card.sub}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
