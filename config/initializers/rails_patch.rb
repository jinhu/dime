
String.class_eval do
  alias :old_plus :+
  def +( val )
    if( val.is_a? Array )
      [ self ] + val
    else
      old_plus val
    end
  end
end
