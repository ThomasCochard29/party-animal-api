import bcrypt from "bcryptjs";

// Model
import User from "../models/userModel.js";

// Get User By Id
export const getUserById = async (req, res) => {
  const { id_user } = req.params;

  try {
    const existingUser = await User.findByPk(id_user);

    if (!existingUser) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    return res
      .status(201)
      .json({ message: `User trouvé avec succès`, data: existingUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Erreur lors de la récupération des informations du User",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'user par son email
    const user = await User.findOne({
      where: {
        email_user: email,
        is_active: 1,
      },
    });

    // Vérifier si l'user existe
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Comparer les mots de passe hashés
    const isPasswordValid = await bcrypt.compare(password, user.password_user);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    return res.status(200).json({ message: "Connexion réussie", user: user });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

// Ajouter un User
export const registerUser = async (req, res) => {
  const { email, password, imageName } = req.body;

  try {
    //! Hash the Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Ajout d'un User avec ses données
    const user = await User.create({
      email_user: email,
      password_user: hashedPassword,
      image_profil: imageName,
    });

    return res
      .status(201)
      .json({ message: "User ajoutées avec succès", data: user });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'User:", error);
    return res.status(500).json({ error: "Erreur lors de l'ajout de l'User" });
  }
};

// Mettre à jour un user
export const updateUser = async (req, res) => {
  const { id_user } = req.params; // Récupérer l'ID du client à mettre à jour

  // Récupérer les nouvelles valeurs du client
  const { email, nom, prenom, imageProfil } = req.body;

  try {
    const existingUser = await User.findByPk(id_user);

    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const updatedUser = await User.update(
      {
        email_user: email,
        nom_user: nom,
        prenom_user: prenom,
        image_profil: imageProfil
      },
      {
        where: {
          id_user,
        },
      }
    );

    return res.status(201).json({
      message: `Utilisateur modifié avec succès`,
      user: updatedUser, // Envoyer les données mises à jour du user
      id_user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
    });
  }
};

// Supprimer un user
export const deleteUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const existingUser = await User.findByPk(id_user);

    if (!existingUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Mettre à jour le champ `is_active` du client à false
    await User.update(
      { is_active: false },
      {
        where: {
          id_user,
        },
      }
    );

    return res.status(201).json({ message: "Votre compte à été désactivé" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la désactivation de votre compte" });
  }
};
