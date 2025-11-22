"use server";

export async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    console.log({
        message: message,
        senders_name: name,
        senders_email: email,
    });
}
