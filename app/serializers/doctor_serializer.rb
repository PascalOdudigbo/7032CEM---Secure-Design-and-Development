class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :specialty
end
