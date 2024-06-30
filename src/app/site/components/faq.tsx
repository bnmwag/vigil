import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { FC } from "react";

const items = [
	{
		question: "Is it accessible?",
		answer: "Yes. It adheres to the WAI-ARIA design pattern.",
	},
	{
		question: "Is it styled?",
		answer:
			"Yes. It comes with default styles that matches the other components' aesthetic.",
	},
	{
		question: "Is it animated?",
		answer:
			"Yes. It's animated by default, but you can disable it if you prefer.",
	},
	{
		question: "Is it responsive?",
		answer: "Yes. It's designed to be responsive out of the box.",
	},
	{
		question: "Is it customizable?",
		answer:
			"Yes. You can customize the styles and animations to match your design system.",
	},
	{
		question: "Is it production-ready?",
		answer: "Yes. It's been battle-tested in production applications.",
	},
	{
		question: "Is it documented?",
		answer: "Yes. It comes with full documentation to help you get started.",
	},
	{
		question: "Is it free?",
		answer:
			"Yes. It's open-source and free to use in personal and commercial projects.",
	},
];

export const FAQ: FC = () => {
	return (
		<section>
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
				<h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
					Frequently asked questions
				</h2>
			</div>
			<div className="mx-auto max-w-screen-md">
				<Accordion type="multiple" className="w-full">
					{items.map((item, index) => (
						<AccordionItem value={`item-${index}`} key={index}>
							<AccordionTrigger>{item.question}</AccordionTrigger>
							<AccordionContent>{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};
