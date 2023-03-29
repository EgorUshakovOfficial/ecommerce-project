import Section from "../containers/Section";
import CheckoutItems from "./CheckoutItems";
import DiscountCode from "./DiscountCode";
import CostSummary from "./CostSummary";

export default function SummarySection(props){
    return (
        <Section style={props.style}>
            <CheckoutItems
                style={{
                    paddingBlock:"0.5em",
                    borderBottom:"1px solid lightgray"
                }}
            />
            <DiscountCode  />
            <CostSummary
                style={{
                    borderTop:"1px solid lightgray",
                    paddingBlock:"0.5em"
                }}
                subtotal={1718.19}
                shippingCost={12.99}
            />
        </Section>
    )
}