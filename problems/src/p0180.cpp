#include <cstdint>
#include <iostream>

int main()
{
    std::int8_t v{ 65 };
    std::cout << static_cast<int>(v) << '\n';
    return 0;
}
