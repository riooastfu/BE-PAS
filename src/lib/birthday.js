export const findBirthdaysInWeek = (people) => {
    const today = new Date();
    const day = today.getDay();
    const year = today.getFullYear();

    const startOfWeek = new Date(year, today.getMonth(), today.getDate() - day);
    const endOfWeek = new Date(year, today.getMonth(), today.getDate() + (6 - day));

    const birthdayPeople = people.filter(person => {
        const birthday = new Date(person.tanggal_lahir);
        birthday.setFullYear(year);
        return birthday >= startOfWeek && birthday <= endOfWeek
    })

    return birthdayPeople
}