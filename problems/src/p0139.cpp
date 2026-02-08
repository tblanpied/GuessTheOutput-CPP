#include <cstdint>
#include <iostream>

int main()
{
    std::uint8_t v{250};
    v = static_cast<std::uint8_t>(v + 10);

    std::cout << static_cast<int>(v) << '\n';
}
