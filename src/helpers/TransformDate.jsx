export default function TransformDate(date) {
    const selectedDate = new Date(date);
    const transformed = selectedDate.toLocaleDateString('en-CA');
    return transformed;
}