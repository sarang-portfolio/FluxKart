import { CONTACT_CONSTANTS } from "./contact.constants";
import contactRepo from "./contact.repo";
import { IContact } from "./contact.types";

const identifyUser = async (email?: string, phoneNumber?: string) => {
  try {
    if (!email && !phoneNumber) {
      throw CONTACT_CONSTANTS.MISSING_CONTACT_INFO;
    }
    // Fetch contacts with matching email or phoneNumber
    const users: IContact[] = await contactRepo.getOneContact(
      email,
      phoneNumber
    );

    if (users.length === 0) {
      // No matching contacts found, create a new primary contact
      const newUser: IContact = await contactRepo.create({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      });

      return {
        primaryContactId: newUser.id,
        emails: [newUser.email || ""],
        phoneNumbers: [newUser.phoneNumber || ""],
        secondaryUserIds: [],
      };
    }

    // Find primary and secondary contacts
    const primaryUsers = users.filter(
      (user) => user.linkPrecedence === "primary"
    );

    let primaryUser: IContact | undefined = primaryUsers[0];

    // If the new contact doesn't match any existing contact
    if (
      !primaryUsers.some(
        (user) => user.email === email || user.phoneNumber === phoneNumber
      )
    ) {
      // Create a new secondary contact if not already existing
      const newSecondaryUser: IContact = await contactRepo.create({
        email: email || primaryUser?.email,
        phoneNumber: phoneNumber || primaryUser?.phoneNumber,
        linkPrecedence: "secondary",
        linkedId: primaryUser?.id,
      });

      users.push(newSecondaryUser); // Include the new secondary contact in the users list
    }

    // Handle the case where there are conflicting primary contacts
    if (primaryUsers.length > 1) {
      // Sort by createdAt to find the older primary user
      primaryUsers.sort(
        (a: IContact, b: IContact) =>
          (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
      );

      const [olderPrimaryUser, newerPrimaryUser] = primaryUsers;

      // Update the newer primary user to become a secondary user
      await contactRepo.update(newerPrimaryUser.id, {
        linkedId: olderPrimaryUser.id,
        linkPrecedence: "secondary",
      });

      // Set the primary user to the older primary user
      primaryUser = olderPrimaryUser;
    }

    // Extract unique emails and phone numbers
    const emails = Array.from(
      new Set(users.map((user) => user.email!).filter(Boolean))
    );
    const phoneNumbers = Array.from(
      new Set(users.map((user) => user.phoneNumber!).filter(Boolean))
    );

    // Get secondary contact IDs
    const secondaryUserIds = users
      .filter((user) => user.linkPrecedence === "secondary")
      .map((user) => user.id);

    return {
      primaryContactId: primaryUser?.id,
      emails,
      phoneNumbers,
      secondaryUserIds,
    };
  } catch (error) {
    throw error;
  }
};

export default {
  identifyUser,
};
