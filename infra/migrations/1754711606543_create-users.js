exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // for reference github limits usernames to 30 characters
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    // why 254 in length? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    // why 72 in length? https://security.stackexchange.com/a/39849
    password: {
      type: "varchar(72)",
      notNull: true,
    },
    // why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

exports.down = false;
