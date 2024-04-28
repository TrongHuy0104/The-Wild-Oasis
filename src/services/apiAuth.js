import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function signIn({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(error);
        throw new Error("Email or password is not correct");
    }
    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return user;
}

export async function logout() {
    let { error } = await supabase.auth.signOut();
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function updateUser({ password, fullName, avatar }) {
    // Update password or full name
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };
    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    // Upload avatar
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // Update avatar
    const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });
    if (error2) throw new Error(error2.message);
    return updateUser;
}
