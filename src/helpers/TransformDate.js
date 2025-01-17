export default function TransformDate(date) {
    const selectedDate = new Date(date);
    const transformed = selectedDate.toLocaleString();
    return transformed;
}