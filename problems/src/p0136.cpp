#include <cstdint>
#include <iostream>

int main()
{
    std::uint8_t v{ 0 };

    for (int i = 0; i < 3; ++i)
    {
        if (i) std::cout << ' ';
        std::cout << static_cast<int>(v);
        --v;
    }

    std::cout << '\n';
    return 0;
}
