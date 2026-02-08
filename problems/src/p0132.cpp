#include <cstdint>
#include <iostream>

int main()
{
    std::uint16_t x{ 65535 };
    std::cout << x << '\n';

    x = 65536;
    std::cout << x << '\n';

    x = 65537;
    std::cout << x << '\n';

    x = 0;
    std::cout << x << '\n';

    x = -1;
    std::cout << x << '\n';

    x = -2;
    std::cout << x << '\n';

    return 0;
}
