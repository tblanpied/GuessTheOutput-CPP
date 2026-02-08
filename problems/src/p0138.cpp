#include <cstdint>
#include <iostream>

int main()
{
    std::int8_t a{65};

    std::cout << a << '\n';
    std::cout << static_cast<int>(a) << '\n';
}
