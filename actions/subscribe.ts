import { phoneSchema } from "@/validators/subscribe";

export interface ActionResponse<T> {
    fieldError?: Partial<Record<keyof T, string | undefined>>;
    formError?: string;
    error?: string;
    success?: boolean | string;
}
type subscribeType = {
    phone: string
}
export async function subscribe(
    _: any,
    formData: FormData,
): Promise<ActionResponse<subscribeType>> {
    const obj = Object.fromEntries(formData.entries());
    // console.log(obj)
    const parsed = phoneSchema.safeParse(obj);
    if (!parsed.success) {

        const err = parsed.error.flatten();
        console.log(err.fieldErrors.phone?.[0])
        return {
            fieldError: {

                phone: err.fieldErrors.phone?.[0]
            },
        };
    }
    //demo action delay to simulate real world backend ops
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(2000)
    return { success: true };
}